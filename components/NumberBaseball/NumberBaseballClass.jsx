import React, { Component } from 'react';
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

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = (e) => {
    e.preventDefault();

    if (this.state.value === this.state.answer.join('')) {
      this.setState((prevState) => {
        return {
          result: '딩동댕',
          tries: [...prev.tries, { try: this.state.value, result: '홈런' }],
        };
      });
      alert('게임을 다시 시작합니다');
      this.setState = {
        value: '',
        answer: getNumbers(),
        tries: [],
      };
    } else {
      const answerArray = this.state.value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;

      if (this.state.tries.length > 9) {
        this.setState({
          result: `10번 이상 시도 실패! 답은 ${this.state.answer.join(
            ','
          )}였습니다`,
        });

        alert('게임을 다시 시작합니다');

        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === this.state.answer[i]) {
            strike++;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball++;
          }
        }

        this.setState((prevState) => {
          return {
            tries: [
              ...prevState.tries,
              {
                try: this.state.value,
                result: `${strike} 스트라이크! ${ball} 볼 입니다!`,
                value: '',
              },
            ],
          };
        });
      }
    }
  };

  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            type='text'
            maxLength={4}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
          <div>시도:{this.state.tries.length}</div>
        </form>
        <ul>
          {this.state.tries.map((v, i) => {
            return <Try key={`${i + 1} 시도`} tryInfo={v} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;
