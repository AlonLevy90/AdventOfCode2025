function findPassword(input: number[]): number {
  let zerosCount = 0;
  let currentIndex = 50;
  
  for (const value of input) {
    currentIndex = ((currentIndex + value) % 100 + 100) % 100;
    
    if (currentIndex === 0) {
      zerosCount++;
    }
  }
  
  return zerosCount;
}


async function main() { 
  const sessionCookie = "";
  
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
    const num = Number(input.slice(1)) % 100;
    return num * direction[input[0]];
  });
  console.log(findPassword(input));
}

main();