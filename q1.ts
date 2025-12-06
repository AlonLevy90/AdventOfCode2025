import 'dotenv/config';

function findPassword(input: number[]): number {
  let zerosCount = 0;
  let currentIndex = 50;
  
  for (let value of input) {
    value %= 100;
    currentIndex = ((currentIndex + value) % 100 + 100) % 100;
    
    
    if (currentIndex === 0) {
      zerosCount++;
    }
  }
  
  return zerosCount;
}

function findPassword2(input: number[]): number {
  let zerosCount = 0;
  let currentIndex = 50;
  let prevIndex = 50;
  
  for (let value of input) {
    zerosCount += Math.floor(Math.abs(value) / 100);
    value %= 100;
    prevIndex = currentIndex;
    currentIndex += value;
    if(0 === currentIndex && prevIndex !== 0) {
      ++zerosCount;
    }
    else if(0 > currentIndex) {
      if(0 < prevIndex) {
        ++zerosCount;
      }
      currentIndex += 100;
    }
    else if(100 <= currentIndex) { 
      ++zerosCount;
        currentIndex -= 100;
    }
  }
  return zerosCount;
}



async function main() { 
  const sessionCookie = process.env.AOC_SESSION;
  
  const res = await fetch("https://adventofcode.com/2025/day/1/input", {
    method: "GET",
    headers: {
      "Cookie": `session=${sessionCookie}`,
      "User-Agent": "AdventOfCode2025/1.0"
    }
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
  }
  
  const data = await res.text();
  const input = (data.split("\n").filter(line => line.trim() !== "")).map(input => {
    const direction = {L: -1, R: 1};
    const num = Number(input.slice(1));
    return num * direction[input[0] as keyof typeof direction];
  });
  console.log(findPassword(input));
  console.log(findPassword2(input));
  console.log(findPassword2([-68, -30,48,-5,60,-55,-1, -99,14,-82]));
}

main();