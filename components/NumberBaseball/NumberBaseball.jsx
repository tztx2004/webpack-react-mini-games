import React, { useState } from 'react';
import Try from './TryClass';

function getNumbers() {
  // 숫자 네개를 겹치지 않게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = () => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers); // lazy init, 리렌더 안하게 함(함수일때만)
  const [tries, setTries] = useState([]);

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (value === answer.join('')) {
      setResult('딩동댕');
      setTries((prev) => [...prev, { try: value, result: '홈런' }]);
      alert('게임을 다시 시작합니다');
    } else {
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;

      if (tries.length > 9) {
        setResult(`10번 이상 시도 실패! 답은 ${answer.join(',')}였습니다`);

        setValue('');
        setAnswer(getNumbers());
        setTries([]);

        alert('게임을 다시 시작합니다');
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(answerArray[i])) {
            ball++;
          }
        }

        setValue('');
        setTries((prev) => [
          ...prev,
          {
            try: value,
            result: `${strike} 스트라이크! ${ball} 볼 입니다!`,
            value: '',
          },
        ]);
      }
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type='text'
          maxLength={4}
          value={value}
          onChange={onChangeInput}
        />
        <div>시도:{tries.length}</div>
      </form>
      <ul>
        {tries.map((v, i) => {
          return <Try key={`${i + 1} 시도`} tryInfo={v} />;
        })}
      </ul>
    </>
  );
};

export default NumberBaseball;
