import { match, throws } from "assert";
import util from "util";

class Logger {
    constructor() {
        this.reset = "\x1b[0m";

        this.fg = {
            black: "\x1b[30m",
            red: "\x1b[31m",
            green: "\x1b[32m",
            yellow: "\x1b[33m",
            blue: "\x1b[34m",
            magenta: "\x1b[35m",
            cyan: "\x1b[36m",
            white: "\x1b[37m",

            brightBlack: "\x1b[90m",
            brightRed: "\x1b[91m",
            brightGreen: "\x1b[92m",
            brightYellow: "\x1b[93m",
            brightBlue: "\x1b[94m",
            brightMagenta: "\x1b[95m",
            brightCyan: "\x1b[96m",
            brightWhite: "\x1b[97m",
        };

        this.bg = {
            black: "\x1b[40m",
            red: "\x1b[41m",
            green: "\x1b[42m",
            yellow: "\x1b[43m",
            blue: "\x1b[44m",
            magenta: "\x1b[45m",
            cyan: "\x1b[46m",
            white: "\x1b[47m",

            brightBlack: "\x1b[100m",
            brightRed: "\x1b[101m",
            brightGreen: "\x1b[102m",
            brightYellow: "\x1b[103m",
            brightBlue: "\x1b[104m",
            brightMagenta: "\x1b[105m",
            brightCyan: "\x1b[106m",
            brightWhite: "\x1b[107m",
        };

        this.style = {
            bold: "\x1b[1m",
            dim: "\x1b[2m",
            italic: "\x1b[3m",
            underline: "\x1b[4m",
            blink: "\x1b[5m",
            reverse: "\x1b[7m",
            hidden: "\x1b[8m",
            strikeThrough: "\x1b[9m",
        };

        this.objDepthColors = [
            this.fg.cyan,
            this.fg.green,
            this.fg.yellow,
            this.fg.magenta,
            this.fg.blue,
            this.fg.red,
        ];
    }

    success(message, data = {}, maxDepth = 1, prettify = true) {
        //This cause extra spaces :
        // console.log(this.fg.green, message, this.reset);

        // Better approach (controllable spaces ):
        const prettyMessage = `${this.bg.green}${this.style.bold}${this.fg.green} ${message} ${this.reset}`;
        console.log(prettyMessage);

        if (!prettify) {
            console.log(data);
            return;
        }

        this.prettyLog(data, maxDepth);
        this.seperator();
    }

    error(message = "", error = new Error()) {
        const prettyMessage = `${this.bg.red}${this.style.bold}${this.fg.red} ${message} ${this.reset}`;
        console.log(prettyMessage, "\n");

        const title = `${this.fg.red}${this.style.bold}[ERROR] :${this.reset}`;
        console.log(title);

        const name = `${this.fg.magenta}${" ".repeat(
            this.defaultIndent,
        )}name : ${this.fg.white}${this.style.bold}${error.name}${this.reset}`;
        console.log(name);

        const errMsg = `${this.fg.magenta}${" ".repeat(
            this.defaultIndent,
        )}message : ${this.fg.white}${this.style.bold}${error.message}${
            this.reset
        }`;
        console.log(errMsg);

        const stackMsg = `${this.fg.magenta}${" ".repeat(
            this.defaultIndent,
        )}stack :${this.reset}`;
        console.log(stackMsg);

        const locations = error.stack.split("\n").slice(1);

        console.log(
            `${this.fg.white}${this.style.bold}${this.style.italic}    [${this.reset}`,
        );

        for (const str of locations) {
            console.log(`${this.style.italic}  ${str}`);
        }

        console.log(`${this.fg.white}${this.style.bold}    ] ${this.reset}`);

        this.seperator();
    }

    seperator(character = ".") {
        const line = character.repeat(70 / character.length);
        console.log(this.fg.black, line, this.reset);
    }
    
    prettyLog(data, maxDepth = 3) {
        // const depth = 0;
        // this.maxDepth = maxDepth;
        // if (!data) return;
        // this.#prettifyData(data, depth);
        // console.log(this.str);
        // this.str = "";

        const inspectString = util.inspect(data, {
            depth: maxDepth,
            colors: false,
            compact: false,
        });

        console.log(this.#prettifyString(inspectString));
    }

    #prettifyString(input) {
        const lines = input.split("\n");
        let output = "";

        for (const line of lines) {
            const trimmedLine = line.trimStart();

            const lineDepth = line.length - trimmedLine.length;
            let intend = " ".repeat(lineDepth);

            // for <tags > 
            if (trimmedLine.match(/^<(.*)\s?(.*)> ?(.*)\s?(.*)$/)) {
                const match = trimmedLine.match(/^<(.*)\s(.*)>(.*)$/);

                const tag = match[1];
                const attributes = match[2];
                const props = match[3];

                output += `${intend}${this.style.italic}${this.style.bold}${this.fg.cyan}<${tag} ${attributes}>${this.reset} ${props}\n`;
            }
            // for prop : [ key : value ] {...}
            else if (trimmedLine.match(/^(.*: )\[(\S+)(.*)\] ?(.*)?$/)) {
                let match = trimmedLine.match(/^(.*: )\[(\S+)(.*)\] ?(.*)?$/); 

                const key = match[1]; 
                const identifier = match[2];
                const content = match[3];
                const properties = match[4] || ""; 

                output += `${intend}${
                    this.objDepthColors[
                        (lineDepth / 2 - 1) % this.objDepthColors.length
                    ]
                }${key}${this.reset}[${identifier}${
                    this.style.italic
                }${content}${this.reset}]${properties}\n`;
            }
            // For prop : value
            else if (trimmedLine.match(/^(.*: )(.+)$/)) {
                let match = trimmedLine.match(/^(.*: )(.+)$/);

                const key = match[1];
                const value = match[2];

                output += `${intend}${
                    this.objDepthColors[
                        (lineDepth / 2 - 1) % this.objDepthColors.length
                    ]
                }${key}${this.reset}${value}\n`;
            } else {
                output += `${intend}${this.style.italic}${trimmedLine}${this.reset}\n`;
            }
        }
        return output;
    }

//     #prettifyData(data, depth = 0, intendBracket = true) {
//         switch (typeof data) {
//             case "object":
//                 if (data === null) {
//                     // Handle null as a special case, if needed
//                     this.str += `${this.fg.brightBlack}<null>${this.reset}`;
//                     return;
//                 }

//                 if (Array.isArray(data)) {
//                     if (this.objCurrDepth >= this.maxDepth) {
//                         this.str += `${" ".repeat(
//                             this.defaultIndent * (depth * intendBracket), // false=0 , true=1
//                         )}${this.fg.white}[Array: ${this.fg.black}${
//                             this.style.italic
//                         }length ${data.length}${this.reset}${this.fg.white}] ${
//                             this.reset
//                         }`;
//                         return;
//                     }
//                     this.#prettifyArray(data, depth, intendBracket);
//                     return;
//                 }
//                 if (this.objCurrDepth >= this.maxDepth) {
//                     this.str += `${this.fg.white}{Object}${this.reset}`;
//                     return;
//                 }
//                 this.objCurrDepth++;
//                 this.#prettifyObject(data, depth, intendBracket);
//                 return;

//             case "string":
//                 this.str += `${this.style.italic}${" ".repeat(
//                     this.defaultIndent * (depth * intendBracket), // false=0 , true=1
//                 )}${data}${this.reset}`;
//                 return;

//             case "function":
//                 if (/^class\s/.test(data.toString())) {
//                     // It's a class, return [class ClassName]
//                     this.str += `${" ".repeat(
//                         this.defaultIndent * (depth * intendBracket), // false=0 , true=1
//                     )}${this.fg.white}[Class ${this.fg.black}${
//                         this.style.italic
//                     }${data.name ? ":" + data.name : "(anonymous)"}${
//                         this.reset
//                     }${this.fg.white}] ${this.reset}`;
//                     return;
//                 }

//                 this.str += `${" ".repeat(
//                     this.defaultIndent * (depth * intendBracket), // false=0 , true=1
//                 )}${this.fg.white}[Function: ${this.fg.black}${
//                     this.style.italic
//                 }${data.name ? ":" + data.name : "(anonymous)"}${this.reset}${
//                     this.fg.white
//                 }> ${this.reset}`;
//                 return;

//             default:
//                 this.str += `${this.style.italic}${" ".repeat(
//                     this.defaultIndent * (depth * intendBracket), // false=0 , true=1
//                 )}${data}${this.reset}`;
//                 return;
//         }
//     }

//     #prettifyArray(data, depth = 0, intendBracket = true) {
//         const shouldBreakLine =
//             data.map((i) => typeof i).includes("object") || data.length > 3;
//         const lineBreak = shouldBreakLine ? "\n" : "";
//         // intendBracket = intendBracket && data.length > 3;
//         this.str +=
//             this.fg.white +
//             this.style.bold +
//             " ".repeat(
//                 this.defaultIndent * (depth * intendBracket), // false=0 , true=1
//             ) +
//             "[" +
//             lineBreak + // only move to next line if there are more than 3 elements
//             this.reset;

//         for (const i of data) {
//             this.#prettifyData(i, depth + 1, true && shouldBreakLine);
//             this.str += "," + lineBreak;
//         }

//         this.str +=
//             this.fg.white +
//             this.style.bold +
//             " ".repeat(
//                 this.defaultIndent * depth * shouldBreakLine, // false=0 , true=1
//             ) +
//             "]" +
//             this.reset;
//     }

//     #prettifyObject(data, depth = 0, intendBracket = true) {
//         const depthColorIndex = this.objCurrDepth % this.objDepthColors.length;
//         const depthColor = this.objDepthColors[depthColorIndex];

//         const shouldBreakLine =
//             Object.values(data)
//                 .map((i) => typeof i)
//                 .includes("object") || Object.keys(data).length > 1;

//         const lineBreak = shouldBreakLine ? "\n" : "";

//         // intendBracket = intendBracket && Object.keys(data).length > 3;

//         this.str +=
//             this.fg.white +
//             this.style.bold +
//             " ".repeat(
//                 this.defaultIndent * (depth * intendBracket), // false=0 , true=1
//             ) +
//             "{" +
//             lineBreak +
//             this.reset;

//         for (const key in data) {
//             this.str +=
//                 " ".repeat(this.defaultIndent * (depth + 1) * shouldBreakLine) +
//                 depthColor +
//                 key +
//                 ": " +
//                 this.reset;

//             const value = data[key];

//             this.#prettifyData(value, depth + 1, false);
//             this.str += "," + lineBreak;
//         }

//         this.str +=
//             this.fg.white +
//             this.style.bold +
//             " ".repeat(this.defaultIndent * depth * shouldBreakLine) +
//             "}" +
//             this.reset;

//         this.objCurrDepth--;
//     }

}

export const logger = new Logger();
