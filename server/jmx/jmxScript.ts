const cp = require('child_process');

try {
	// INITIAL SETUP
	// URL for JMX Exporter agent download
	const cmdWindows =
		'curl --output JMXFILE.jar https://repo1.maven.org/maven2/io/prometheus/jmx/jmx_prometheus_javaagent/0.16.0/jmx_prometheus_javaagent-0.16.0.jar';
	const JMXInstallerLinux =
		'sudo wget https://repo1.maven.org/maven2/io/prometheus/jmx/jmx_prometheus_javaagent/0.13.0/jmx_prometheus_javaagent-0.13.0.jar';

	// Create directory and download JMX Exporter Agent
	const cwd = { cwd: '..' };
	cp.execSync(`mkdir jmx`, cwd);
	cwd.cwd = '../jmx';
	cp.execSync(cmdWindows, cwd);

	// Find Kafka path and copy JMX Exporter file into libs dir
	const kafkaServerDir = cp.execSync(
		'find /home -type d -iname "kafka_2.13-2.8.0*"' //! handle different version
	);
	const kafkaServerStr = kafkaServerDir.toString();
	const diectory = kafkaServerStr.replace(/\n/g, '');
	const kafkaLibsDir = `${diectory}/libs/`;
	cp.execSync('cp JMXFILE.jar ' + kafkaLibsDir, cwd);

	// CONFIGURE EXPORTER
	const kafkaConfigDir = `${diectory}/config/`;
	const kafkaServerStart = `${diectory}/bin/`;
	cp.execSync(`cp kafka-2_0_0.yml ${kafkaConfigDir}`);

	// Remove and replace existing kafka-server-start.sh file
	cp.execSync(`rm ${kafkaServerStart}kafka-server-start.sh`);
	cp.execSync(`cp kafka-server-start.sh ${kafkaServerStart}`);
	cp.execSync(`sudo chmod +x kafka-server-start.sh`);

	const serverPropertiesPath = `${kafkaConfigDir}server.properties`;
	const kafkaServerStartPath = `${kafkaServerStart}kafka-server-start.sh`;
	const kafkaServerStopPath = `${kafkaServerStart}kafka-server-stop.sh`;
	const jmxExporterPath = `${kafkaLibsDir}JMXFILE.jar`;
	const kafkaYmlPath = `${kafkaConfigDir}kafka-2_0_0.yml`;

	// IMPORTANT: Creating kafka.service file with correct paths
	cp.execSync(`echo "[Service]" > kafka.service`);
	cp.execSync(`echo "Type=simple" >> kafka.service`);

	let quotes = '"';

	cp.execSync(
		`echo 'Environment=${quotes}JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64${quotes}' >> kafka.service` //! java directory
	);
	cp.execSync(`echo "##Add the line below" >> kafka.service`);
	cp.execSync(
		`echo 'Environment=${quotes}KAFKA_OPTS=-javaagent:${jmxExporterPath}=7075:${kafkaYmlPath}${quotes}' >> kafka.service` //! port number
	);
	cp.execSync(
		`echo "ExecStart=${kafkaServerStartPath} ${serverPropertiesPath}" >> kafka.service`
	);
	cp.execSync(`echo "ExecStop=${kafkaServerStopPath}" >> kafka.service`);
	cp.execSync(`echo "Restart=on-abnormal" >> kafka.service`);

	// CONFIGURE SYSTEMD
	// CHECK FOR SYSTEMD
	const checkSystemDKafka = cp.execSync(
		'find /etc/systemd/system -type f -iname "kafka.service"'
	);
	const systemDPathString = checkSystemDKafka.toString();
	const resolvedSystemDPath = systemDPathString.replace(/\n/g, '');
	cp.execSync(`sudo rm ${resolvedSystemDPath}`);
	console.log('sucessfully removed original kafka.service file.');
	cp.execSync(`sudo cp kafka.service ${resolvedSystemDPath}`);

	// check if daemon reload and restart are both possible from this cwd
	console.log(
		'new kafka.service file copied onto ~/systemd/system/. Beginning daemon-reload'
	);
	cp.execSync('systemctl daemon-reload');
	cp.execSync('systemctl restart kafka');

	cp.execSync('systemctl start kafka');
	cp.execSync('systemctl start zookeeper');
	console.log(
		'JMX Exporter has been installed and configured. You may now go to localhost:7075 to check metrics'
	);
	console.log(
		`If localhost:7075 doesn't work, open up the firewall that port.`
	);
} catch (err) {
	console.log('err', err);
}
