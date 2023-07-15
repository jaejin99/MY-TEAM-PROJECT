//구글 검색으로 찾아낸 터미널에서 입력한 값을 받는 readline 모듈
const readline = require('readline');

//아직 전혀 모르곘지만 구글링해서 나온 readline모듈 사용시 작성해야할 것
const output = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

//1.랜덤한 3가지 숫자를 뽑는 함수
function generateRandomNumber() {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let randomNumber = "";

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * 10); 
    //Math.random으로 하면 0~1 사이의 소수가 나오기 떄문에 10을 곱하고 Math.floor를 이용해 소수점을 버림
    randomNumber += digits.splice(randomIndex, 1);
    //splice를 활용하여 뽑았던 숫자가 이후 반복과정에서 다시나오지 않도록 삭제함
  }

  return randomNumber;
}

//2. 스트라이크 볼 판단
function checkGuess(randomNumber, guess) {
  let strikes = 0;
  let balls = 0;

  for (let i = 0; i < 3; i++) 
  {
    if (randomNumber[i] === guess[i]) 
    {strikes++;} 
    else if (randomNumber.includes(guess[i])) 
    {balls++;}
    //===을 활용해 위치와 숫자가 모두일치할 경우 스트라이크, includes를 활용하여 배열에 포함만 하고 있을 경우엔 볼
  }

  return { strikes, balls };
}
//3.결과 표현
function displayResult(result) 
{
    const { strikes, balls } = result;
  //const result = { strikes, balls };
  // 둘의 차이를 도저히 모르겠으나 Identifier 'result' has already been declared라는 오류를 보고 result를만지다가 알아냄, 추가적인 공부가 필요할듯
  if (strikes === 0 && balls === 0) 
  {
    console.log('0B0S');
  } 
  else 
  {
    let output = '';
    if (strikes > 0) {
      output += `${strikes}S `; 
    }
    if (balls > 0) {
      output += `${balls}B `;
    }
    console.log(output);
  }
  // 보통의 경우 볼과 스트라이크가 나왔을때만 출력, 조건문과 논리곱 연산자를 활용하여 볼과 스트라이크가 모두 0일 경우에만 0B0S가 나오도록 함
}
//게임 시작함수 선언
function game() 
{
  const randomNumber = generateRandomNumber();
  let attempts = 0;
  function promptInput() // 이후에 promptInput()을 참조가 안되었는데 아예 함수안에 넣어서 해결함
  {
    attempts++;
    //구글로 검색해서 찾아낸 .question으로 출력하는 법
    output.question(`${attempts}번째 시도: `, (guess) => {
      if (!/^\d{3}$/.test(guess)) //숫자를 3개 썼을 경우에만 작동하도록하는 조건문, 구글링검색으로 발췌해서 잘 모름.
      {
        console.log('올바른 숫자를 입력해주세요.');
        promptInput(); //함수를 재호출하고 입력을 기다림
        return;
      }
      const result = checkGuess(randomNumber, guess);
      
      if (result.strikes === 3) {
        console.log(`게임을 종료합니다. ${attempts}번만에 맞히셨습니다.`);
        output.close(); // readline모듈을 끝냄
        return;
      }

      displayResult(result); //결과를 마지막으로 출력하고 마무리함
      promptInput(); // 넣지 않으면 다음 입력을 하지못하는 문제가 발생함!!
    });
  }

  promptInput();
}

game(); //게임시작함수

