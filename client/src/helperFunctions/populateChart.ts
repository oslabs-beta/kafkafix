import { populateChartActionCreator } from '../state/actions/actions';

const createChartData = (inputData: any) => {
  // inputData = [{metric, value}, {metric, value}]
  console.log('received input data inside createChartData',inputData);
  const {
    metric: { __name__: label },
  } = inputData[0];
  const labels: string[] = [];
  const data: number[] = [];
  const backgroundColor: string[] = backgroundColorCreator(inputData.length);
  const borderWidth = 4;

  inputData.forEach((el: any) => {
    let label = '';
    Object.keys(el.metric).forEach((key, i, arr) => {
      if (key !== '__name__') {
        label += key + ': ' + el.metric[key];
        if (i !== arr.length - 1) {
          label += '\n';
        }
      }
    });
    labels.push(label);
    let addedData = false;
    for (let i = 0; i < el.value.length; i++) {
      if (typeof el.value[i] === 'number') {
        data.push(el.value[i]);
        addedData = true;
        break;
      }
    }
    if (!addedData) data.push(0);
  });

  const dataSetObj = { label, data, backgroundColor, borderWidth };
  const formattedData = { labels, datasets: [dataSetObj] };
  console.log(formattedData);
  // once you have labels and data
  // call backgroundColorCreator and pass in labels.length
  return formattedData;
};

// fire Action Creator
export const populateChart = (data: any, dispatch: any) => {
  const formattedData = createChartData(data);
  dispatch(populateChartActionCreator(formattedData));
};

const backgroundColorCreator = (length: number) => {
  const backgroundColor = [];
  while (length > 0) {
    const val1 = getRandomArbitrary();
    const val2 = getRandomArbitrary();
    const val3 = getRandomArbitrary();
    backgroundColor.push(`rgba(${val1}, ${val2}, ${val3}, 0.2)`);
    length--;
  }

  return backgroundColor;
};

const getRandomArbitrary = (): number => {
  return Math.floor(Math.random() * (255 - 0) + 0);
};
// { labels: [], datasets: []}

// format for data object
// {
//     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//     datasets: [
//       {
//         label: "# of Votes",
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(255, 206, 86, 0.2)",
//           "rgba(75, 192, 192, 0.2)",
//           "rgba(153, 102, 255, 0.2)",
//           "rgba(255, 159, 64, 0.2)"
//         ],
//         borderWidth: 4
//       }
//     ]
//   }
