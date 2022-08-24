const express = require("express");
const app = express();
const port = 3001;
const htmlToPdf = require("html-pdf-node");
const ejs = require("ejs");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/pdf", async (req, res) => {
  const options = { format: "A4" };
  // const file = { content: "<h1>Welcome to hii html-pdf-node</h1>" };

  let templateHtml = "";
  try {
    templateHtml = await ejs.renderFile(
      "./templates/report.html.ejs",
      { data: { text: "oil" } },
      { async: true }
    );
  } catch (error) {
    console.log(error);
  }

  const file = { content: templateHtml };

  htmlToPdf
    .generatePdf(file, options)
    .then((pdfBuffer) => {
      console.log("PDF Buffer:-", pdfBuffer);
      res
        .writeHead(200, {
          "Content-Type": "application/pdf",
          // "Content-Disposition": "attachment;",
        })
        .end(pdfBuffer);
    })
    .catch((err) => {
      console.log("Error:-", err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
