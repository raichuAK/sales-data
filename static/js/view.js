import convertToTree from '../../lib/convertor.mjs';

async function getTreeData(parentId) {
  const response = await fetch(`http://localhost:3000/api/parent/${parentId}`);
  const jsonResp = await response.json();
  return jsonResp;
}

async function getAvgPrice() {
  const response = await fetch(`http://localhost:3000/api/avgPrice`);
  const jsonResp = await response.json();
  return jsonResp;
}

async function getMakePercent() {
  const response = await fetch(`http://localhost:3000/api/makePercent`);
  const jsonResp = await response.json();
  return jsonResp;
}

async function getTop30price() {
  const response = await fetch(`http://localhost:3000/api/top30price`);
  const jsonResp = await response.json();
  return jsonResp;
}

async function getTop5PerMonth() {
  const response = await fetch(`http://localhost:3000/api/top5perMonth`);
  const jsonResp = await response.json();
  return jsonResp;
}

async function createTree() {
  const apiData = await getTreeData('all');
  const hierarchyData = await convertToTree(apiData);

  const avgListData = await getAvgPrice();
  let ans1 = document.getElementById('answer1');
  ans1.querySelector('#content').innerText = JSON.stringify(avgListData);


  const avgPercentData = await getMakePercent();
  let ans2 = document.getElementById('answer2');
  ans2.querySelector('#content').innerHTML = JSON.stringify(avgPercentData);

  const top30price = await getTop30price();
  let ans3 = document.getElementById('answer3');
  ans3.querySelector('#content').innerHTML = JSON.stringify(top30price);

  const top5 = await getTop5PerMonth();
  let ans4 = document.getElementById('answer4');
  ans4.querySelector('#content').innerHTML = JSON.stringify(top5);

}

createTree();

export default createTree;
