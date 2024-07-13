// terminal colors
const GREEN_COLOR = '\x1b[32m';
const RED_COLOR   = '\x1b[31m';
const END_COLOR   = '\x1b[0m';


class JRspec {
  constructor() {
    this.testCases   = [];
    this.description = null;
    this.startTime   = null;
    this.endTime     = null;
  }


  describe(description, callback) {
    this.description = description;

    this.startTime = Date.now();
    callback();
    this.endTime = Date.now();

    this.run();
  }


  it(description, callback) {
      this.testCases.push({description, callback});
  }

  
  run() {
    const examples = this.testCases.length;
    let failures   = 0;

    console.log(this.description);
    console.log('-'.repeat(this.description.length));
    
    this.testCases.forEach(testCase => {
      console.log(testCase.description);
      const result = testCase.callback();
      if (result === false) 
        failures += 1;
      const status = result === true ? "Pass" : "Fail";
      printColored(status, status === "Pass" ? GREEN_COLOR : RED_COLOR);
      console.log("\n");
    });


    console.log(`Finished in ${(this.endTime - this.startTime) / 1000} seconds.`);

    console.log(`${examples} examples, ${failures} ${failures === 1 ? 'failure' : 'failures'}`);
  }


  printSimpleReport() {
  
  }

  printSpec() {
    console.log(`Describe ${this.description}`);
    for(let i = 0; i < this.examples; i++) {
      console.log(`\t${i+1}. ${this.testCases[i].testCase}`);
    }
  }
}


function printColored(text, color = GREEN_COLOR) {
  console.log(`${color}${text}${END_COLOR}`);
}


// exports

export function expect(value) {
  return {
    value:         value,
    to_eq:         (expected) => value === expected,
    to_not_eq:     (expected) => value !== expected,
    to_be_truthy:  () => value == true
    }
}

export const jrspec = new JRspec();

