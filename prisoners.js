import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.log("Enter to number of prisoners you want to get freed?");
rl.question(
  `NOTE: Since It's Node Application\nNOTE: It is suggested to keep number 
  of prisoners to be less then equal to 30000 and in even number:\n`,
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
    this.calculateProbability();
  }

  createDrawer() {
    let i = 0;
    while (i < this.prisoners) {
      const prisonerNumber = Math.floor(Math.random() * this.prisoners);
      if (this.isPrisonerNumberExists(prisonerNumber) >= 0) {
        continue;
      } else {
        this.drawer.push(prisonerNumber);
        i++;
      }
    }
  }

  isPrisonerNumberExists(number) {
    const index = this.drawer.findIndex((d) => d == number);
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
      drawerNumber = this.drawer[drawerNumber];
      drawers.push(drawerNumber);
      if (drawerNumber === number) {
        this.isFreed[number] = true;
        break;
      }
    }
    console.log("-----------------------------------------------");
    console.log("prisoner number:", number);
    console.log("Checked Drawers:", drawers.length);
    console.log("-----------------------------------------------");
  }

  checkIsPrisonerCanFreed() {
    console.log(
      "\n\n\nIs Prisoner Freed",
      this.isFreed.every((d) => d)
    );
  }

  calculateProbability() {
    const probability_of_failure = this.submissionOfN(
      parseInt(this.prisoners / 2) + 1,
      this.prisoners
    );

    console.log("Probability of success(As wiki):", 1 - probability_of_failure);
    console.log(
      "Probability of success for current cycle:",
      this.isFreed.filter((d) => d).length / this.prisoners
    );
  }

  submissionOfN(from, to) {
    let n = from;
    let sum = 0;
    while (n <= to) {
      sum += 1 / n;
      n++;
    }
    return sum;
  }
}
