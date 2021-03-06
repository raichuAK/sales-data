async function getAvgPrice() {
  const response = await fetch('http://localhost:3000/api/avgPrice');
  const jsonResp = await response.json();
  return jsonResp;
}

async function getMakePercent() {
  const response = await fetch('http://localhost:3000/api/makePercent');
  const jsonResp = await response.json();
  return jsonResp;
}

async function getTop30price() {
  const response = await fetch('http://localhost:3000/api/top30price');
  const jsonResp = await response.json();
  return jsonResp;
}

async function getTop5PerMonth() {
  const response = await fetch('http://localhost:3000/api/top5perMonth');
  const jsonResp = await response.json();
  return jsonResp;
}

async function createTree() {
  const avgListData = await getAvgPrice();
  const avgPercentData = await getMakePercent();
  const top30price = await getTop30price();
  const top5 = await getTop5PerMonth();


  const ans1 = document.getElementById('answer1');
  ans1.querySelector('#content').innerText = JSON.stringify(avgListData);

  const ans2 = document.getElementById('answer2');
  ans2.querySelector('#content').innerHTML = JSON.stringify(avgPercentData);

  
  const ans3 = document.getElementById('answer3');
  ans3.querySelector('#content').innerHTML = JSON.stringify(top30price);

  const ans4 = document.getElementById('answer4');
  ans4.querySelector('#content').innerHTML = JSON.stringify(top5);
}

createTree();

export default createTree;
