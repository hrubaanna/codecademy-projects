// Context: You're part of a research team that has found a new mysterious 
//organism at the bottom of the ocean near hydrothermal vents. Your team names
//the organism, Pila aequor (P. aequor), and finds that it is only comprised 
//of 15 DNA bases. The small DNA samples and frequency at which it mutates 
//due to the hydrothermal vents make P. aequor an interesting specimen to study.
//However, P. aequor cannot survive above sea level and locating P. aequor 
//in the deep sea is difficult and expensive. Your job is to create objects 
//that simulate the DNA of P. aequor for your research team to study.

let log = console.log;


// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//factory function to create objects
const pAequorFactory = (specimenNum, dna) => {
  //return an object of the specimen
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      const dnaBases = ['A', 'T', 'C', 'G'];
      log("old dna: " + this.dna);

      //randomly select a base in object's dna
      let baseToChangePos = Math.floor(Math.random() * this.dna.length);
      let selectedBase = this.dna[baseToChangePos];
      //get array of possible options to change to
      let posOfBase = dnaBases.indexOf(selectedBase);
      dnaBases.splice(posOfBase,1);

      //choose replacement base
      let replacementBase = dnaBases[Math.floor(Math.random() * dnaBases.length)];

      //change current base to randomly selected different base
      this.dna[baseToChangePos] = replacementBase;
      log("new dna: " + this.dna)
    },
    compareDNA(specimen) {
      //print percentage of DNA shared by this and provided pAequor
      // e.g.: specimen #1 and specimen #2 have 25% DNA in common
      let sumCommonBases = 0;
      let numBases = this.dna.length;

      this.dna.forEach((base, i) => {
        if(base == specimen.dna[i]) {
          sumCommonBases++;
        }
      })

      const percentageShared = Math.floor(sumCommonBases / numBases * 100);
      log("specimen #"+ this.specimenNum +" and specimen #" + specimen.specimenNum + " have " + percentageShared + "% DNA in common.");
    },
    willLikelySurvive() {
      //return true if dna contains > 60% C or G bases
      let numBases = this.dna.length;
      let numCorG = 0;
      this.dna.forEach((base) => {
        if(base == 'C' || base == 'G') {
          numCorG++;
        }
      })

      if(Math.floor(numCorG / numBases * 100) >= 60) {
        log("more than 60");
        return true;
      }
    },
    complementStrand() {
      let strand = [];
      //return complementary strand to this object
      this.dna.forEach(base => {
        //get opposite base
        let newBase = ''
        if(base == 'A') {
          newBase = 'T';
        } else if(base == 'T') {
          newBase = 'A'
        } else if(base == 'C') {
          newBase = 'G'
        } else {
          newBase = 'C'
        }
        strand.push(newBase)
      })
      return strand;
    }
  }
} 

//create 30 instances of pAequor that will likely survive
const getSurvivingInstances = numSurvivors => {
  let survivorArr = [];
  let id = 0;
  while(survivorArr.length < numSurvivors) {
    //create a specimen
    let specimen = pAequorFactory(id, mockUpStrand());
    //test if they have a survival chance
    if(specimen.willLikelySurvive()) {
      survivorArr.push(specimen);
      id++;
    }
  }
  return survivorArr;
}

//get the 2 most compatible instances of pAequor
const getMostCompatible = arr => {
  
}

//testing
let specimen1 = pAequorFactory(1, mockUpStrand());
let specimen2 = pAequorFactory(2, mockUpStrand());
//specimen1.mutate();
//specimen1.compareDNA(specimen2);
//specimen1.willLikelySurvive();

//log(getSurvivingInstances(3));

log(specimen1.complementStrand());





