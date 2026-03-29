const channelID = "3315209";
const readAPI = "56JR02YB4AFXT25M";

const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${readAPI}&results=10`;

// Charts
const donutChart = new Chart(document.getElementById("donutChart"), {
  type: "doughnut",
  data: {
    labels: ["Used", "Saved"],
    datasets: [{
      data: [60, 40]
    }]
  }
});

const barChart = new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels: ["Mon", "Tue", "Wed"],
    datasets: [{
      label: "Power",
      data: [120, 150, 180]
    }]
  }
});

const lineChart = new Chart(document.getElementById("lineChart"), {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Power",
      data: []
    }]
  }
});

// Fetch data
async function getData() {
  const res = await fetch(url);
  const data = await res.json();

  let feeds = data.feeds;
  let latest = feeds[feeds.length - 1];

  let power = parseFloat(latest.field1) || 0;
  let motion = parseInt(latest.field2);
  let device = parseInt(latest.field4);

  document.getElementById("power").innerText = "⚡ " + power + " W";
  document.getElementById("occupancy").innerText =
    motion ? "👤 Occupied" : "Empty";

  document.getElementById("status").innerText =
    device ? "🟢 ON" : "🔴 OFF";

  // Update chart
  lineChart.data.labels.push("");
  lineChart.data.datasets[0].data.push(power);
  lineChart.update();
}

// Date
document.getElementById("date").innerText =
  new Date().toDateString();

setInterval(getData, 5000);
getData();