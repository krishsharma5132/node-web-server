// Assignment 6 - Simple Web Server using Node.js
// Name: KRISH SHARMA
// Roll No: 28299

const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const PORT = 3000;

// Function to serve an HTML file
async function servePage(res, fileName, statusCode = 200) {
    try {
        const filePath = path.join(__dirname, "pages", fileName);
        const data = await fs.readFile(filePath, "utf8");

        res.writeHead(statusCode, {
            "Content-Type": "text/html"
        });

        res.end(data);
    } catch (error) {
        console.log("Error while reading file:", error);

        res.writeHead(500, {
            "Content-Type": "text/plain"
        });

        res.end("500 - Internal Server Error");
    }
}

// Function to serve CSS file
async function serveCSS(res) {
    try {
        const filePath = path.join(__dirname, "public", "style.css");
        const data = await fs.readFile(filePath, "utf8");

        res.writeHead(200, {
            "Content-Type": "text/css"
        });

        res.end(data);
    } catch (error) {
        res.writeHead(500, {
            "Content-Type": "text/plain"
        });

        res.end("500 - Unable to load CSS file");
    }
}

// Creating the HTTP server
const server = http.createServer(async (req, res) => {

    console.log(`${req.method} ${req.url}`);

    // Home route
    if (req.url === "/" || req.url === "/home") {
        await servePage(res, "home.html");
    }

    // About route
    else if (req.url === "/about") {
        await servePage(res, "about.html");
    }

    // Contact route
    else if (req.url === "/contact") {
        await servePage(res, "contact.html");
    }

    // CSS file
    else if (req.url === "/style.css") {
        await serveCSS(res);
    }

    // Invalid route - Custom 404 page
    else {
        await servePage(res, "404.html", 404);
    }
});

// Starting the server
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
