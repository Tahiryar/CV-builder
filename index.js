const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // Parse form data

app.get("/", (req, res) => {
    res.render("index");
});

// Route to handle form submission
app.post("/generate-cv", (req, res) => {
    let experience = [];
    let projects = [];

    try {
        experience = JSON.parse(req.body.experience || "[]");
    } catch (error) {
        console.error("Invalid JSON format for experience:", error);
        return res.status(400).send("Invalid JSON format for experience. Please enter a valid JSON array.");
    }

    try {
        projects = JSON.parse(req.body.projects || "[]");
    } catch (error) {
        console.error("Invalid JSON format for projects:", error);
        return res.status(400).send("Invalid JSON format for projects. Please enter a valid JSON array.");
    }

    // Parse and structure the remaining data
    const cvData = {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        education: req.body.education,
        skills: req.body.skills.split(",").map(skill => skill.trim()),
        experience,
        certifications: req.body.certifications.split(",").map(cert => cert.trim()),
        projects
    };

    // Render the selected template with the parsed CV data
    res.render(req.body.template, cvData);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
