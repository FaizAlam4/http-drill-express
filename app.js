const express = require("express");
const uid = require("uuid");

let app = express();

app.get("/", (req, res) => {
  res.status(200).send("This is my home page");
});

app.get("/html", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

app.get("/json", (req, res) => {
  {
    let obj = {
      slideshow: {
        author: "Yours Truly",
        date: "date of publication",
        slides: [
          {
            title: "Wake up to WonderWidgets!",
            type: "all",
          },
          {
            items: [
              "Why <em>WonderWidgets</em> are great",
              "Who <em>buys</em> WonderWidgets",
            ],
            title: "Overview",
            type: "all",
          },
        ],
        title: "Sample Slide Show",
      },
    };

    res.status(200).json(obj);
  }
});

app.get("/uuid", (req, res) => {
  var myUid = uid.v4();
  res.status(200).json({ uuid: myUid });
});

app.get("/status/:id", (req, res) => {
  let myStatus = req.params;
  console.log(myStatus);
  try {
    res
      .status(Number(myStatus["id"]))
      .send(`returned respnse with status code ${myStatus["id"]}`);
  } catch (err) {
    res.status(400).send(`${myStatus["id"]} is invalid status code`);
  }
});

app.get("/delay/:id", (req, res) => {
  let second = req.params;
  setTimeout(() => {
    res
      .status(200)
      .send(`returned response with delay of ${second["id"]} seconds`);
  }, parseInt(second["id"]) * 1000);
});
app.get("/*", (req, res) => {
  res.status(404).send("Page  not found");
});

app.listen(8000, () => {
  console.log("Running at port:", 8000);
});
