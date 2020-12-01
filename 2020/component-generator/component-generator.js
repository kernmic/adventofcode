if (process.argv.length < 3) {
    console.error("component name missing");
    console.log("Usage: yarn create-component MyComponentName* TemplateName?");
    return;
}
if (!process.env.INIT_CWD) {
    console.error("yarn must be >= 1.13.0");
    return;
}

const fs = require("fs");
const handlebars = require("handlebars");

// Config
const componentName = process.argv[2];
const templateName = process.argv[3] || "component";
const componentFileName = convertCamelCaseToKebabCase(componentName);
const componentClassName = componentFileName;
const templateDir = `${__dirname}/templates/${templateName}`;
const targetDir = process.env.INIT_CWD;

// Helpers
handlebars.registerHelper("toLowerCase", function (str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
});
function convertCamelCaseToKebabCase(camelCaseName) {
    return camelCaseName
        .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
        .toLowerCase()
        .substr(1);
}

const writeFile = (filePath, content) => {
    fs.writeFile(filePath, content, function (err) {
        if (err) throw err;
        console.log(`${filePath} created`);
    });
};

const createDirectoryIfNotExisting = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
};

const getAllTemplates = (directory) =>
    fs.readdirSync(directory).map((template) => ({
        isDir: fs.lstatSync(`${directory}/${template}`).isDirectory(),
        dirName: template,
        source: `${directory}/${template}`,
        target: template.slice(0, template.length - 4).replace("{{componentFileName}}", componentFileName),
    }));

const processTemplatesForDirectory = (directory, target) => {
    getAllTemplates(directory).forEach((template) => {
        console.log(directory);
        if (template.isDir) {
            createDirectoryIfNotExisting(`${target}/${template.dirName}`);
            processTemplatesForDirectory(template.source, `${target}/${template.dirName}`);
            return;
        }
        const compiledTemplate = handlebars.compile(fs.readFileSync(template.source, "utf8"));
        writeFile(
            `${target}/${template.target}`,
            compiledTemplate({
                componentName,
                componentFileName,
                componentClassName,
            })
        );
    });
};

// Generate
createDirectoryIfNotExisting(`${targetDir}/${componentFileName}`);
processTemplatesForDirectory(templateDir, `${targetDir}/${componentFileName}`);
