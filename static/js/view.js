import * as d3 from 'd3';
import convertToTree from '../../lib/convertor.mjs';

async function getTreeData(parentId) {
  const response = await fetch(`http://localhost:3000/api/parent/${parentId}`);
  const jsonResp = await response.json();
  return jsonResp;
}

async function createTree() {
  const apiData = await getTreeData('all');
  const hierarchyData = await convertToTree(apiData);
  let ans1 = document.getElementById('answer1');
  ans1.querySelector('#content').innerText = JSON.stringify(hierarchyData);

  let ans2 = document.getElementById('answer2');
  ans2.querySelector('#content').innerHTML = JSON.stringify(hierarchyData);


  let ans3 = document.getElementById('answer3');
  ans3.querySelector('#content').innerHTML = JSON.stringify(hierarchyData);

  let ans4 = document.getElementById('answer4');
  ans4.querySelector('#content').innerHTML = JSON.stringify(hierarchyData);
}

createTree();

export default createTree;
