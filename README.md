
## What is it ?

`nano-command-engine` is a simple tool to run shell commands sequentially in mac,windows and linux.


## How to Install ?

To install  run

```bash
  npm install https://github.com/sandarshnaroju/nano-command-engine.git
```
## Usage 

To use  

``` javascript

  const { run } = require("nano-command-engine");

  run(
      [
        {
          name: "list files",
          windows: "",
          mac: "",
          linux: "ls",
          dependencies: [
            {
              name: "create folder",
              windows: "",
              mac: "",
              linux: "mkdir newFolder",
              dependencies: [],
            },
          ],
        },
      ],
      (current, total) => {
        console.log("Progress", current, total);
      },
      () => {
        console.log("Finished");
      }
    );
```
