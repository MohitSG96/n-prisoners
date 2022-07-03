import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.log("Enter to number of prisoners you want to get freed?");
rl.question(
  "NOTE: It is suggested to keep number of prisoners to be more then 50 and in even number:\n",
  (number_of_prisoners) => {
    try {
      if (isNaN(number_of_prisoners)) {
        throw new Error("Entered value is not a number");
      }
      new NPrisonerProblem(parseInt(number_of_prisoners));
    } catch (error) {
      console.error(error.message, "\n\n");
      // console.error(error);
    }
    rl.close();
  }
);

class NPrisonerProblem {
  prisoners = 0;
  drawer = [];
  isFreed = [];
  constructor(prisoners) {
    this.prisoners = prisoners;
    this.isFreed = new Array(prisoners);
    this.createDrawer();
    this.enterPrisonerSequentially();
    this.checkIsPrisonerCanFreed();
  }

  createDrawer() {
    let i = 0;
    while (i < this.prisoners) {
      const prisonerNumber = parseInt(Math.random() * this.prisoners);
      if (this.isPrisonerNumberExists(prisonerNumber) >= 0) {
        continue;
      } else {
        this.drawer.push({
          i: i,
          value: prisonerNumber,
        });
        i++;
      }
    }
  }

  isPrisonerNumberExists(number) {
    const index = this.drawer.findIndex((d) => d.value == number);
    return index;
  }

  enterPrisonerSequentially() {
    let currentPrisoner = 0;
    while (currentPrisoner < this.prisoners) {
      this.checkPrisoner(currentPrisoner++);
    }
  }

  checkPrisoner(number) {
    let drawers = [];
    let drawerNumber = number;
    while (true) {
      if (drawers.length >= this.prisoners / 2) {
        this.isFreed[number] = false;
        break;
      }
      drawerNumber = this.drawer[drawerNumber].value;
      drawers.push(drawerNumber);
      if (drawerNumber === number) {
        this.isFreed[number] = true;
        break;
      }
    }
    console.log("-----------------------------------------------");
    console.log("prisoner number:", number);
    console.log("Checked Drawers:", drawers.length);
    console.log("check:", drawers);
    console.log("-----------------------------------------------");
  }

  checkIsPrisonerCanFreed() {
    console.log(
      "\n\n\nIs Prisoner Freed",
      this.isFreed.every((d) => d)
    );
  }
}
