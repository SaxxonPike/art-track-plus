// Very rudimentary, but has no other dependencies. Conforms to RFC 4180.
// Why didn't we just import a library to do this? Because they all seemingly
// have dependencies that are not compatible with client-side JS execution
// without some wild polyfill magic. It's CSV, for gods' sake.
function parse(csv: string, maxLines = -1): string[][] {
    const chars = Array.from(csv);
    let quoted = false;
    let lastC = "";
    let line = [];
    let cell = "";
    const lines = [];
    console.log("parse", csv);

    // Due to the double quote escape mechanism, we can't just split strings-
    // we have to iterate the whole thing.
    chars.forEach(c => {
        if (lastC == "\"") {
            switch (c) {
                case "\"": {
                    // We must interpret two consecutive double quotes
                    // as one double quote in cell data.
                    lastC = "";
                    cell += "\"";
                    return;
                }
                default: {
                    // Double quotes toggle the "quoted" state.
                    quoted = !quoted;
                    break;

                }
            }
        }

        if (quoted) {
            if (c != "\"") {
                // Quoted state allows the use of carriage return
                // and comma in cell data.
                cell += c;
            }
        } else {
            switch (c) {
                case "\"":
                case "\r": {
                    // Line feeds are ignored.
                    // Double quotes need read-ahead.
                    break;
                }
                case ",": {
                    // The comma separates cells.
                    line.push(cell.trim());
                    cell = "";
                    break;
                }
                case "\n": {
                    // The carriage return separates records.
                    const isNotBlank = (cell.length > 0 || line.length > 0);
                    if (isNotBlank) {
                        line.push(cell.trim());
                        lines.push(line);
                        line = [];
                        cell = "";
                        if (maxLines > 0 && lines.length >= maxLines) {
                            return;
                        }
                    }
                    break;
                }
                default: {
                    // Everything else is added to the cell data verbatim.
                    cell += c;
                    break;
                }
            }
        }


        lastC = c;
    });

    return lines;
}

const CsvParser = {
    parse: parse
}

export default CsvParser;
