import React from "react";
import "./tackle.scss";
import { getOpenAiModel } from "../../api/model-build";
import axios from "axios";

class Tackle extends React.Component {
  constructor(props) {
    super(props);

    console.log("Tackle constructor...");
    console.dir(this);
  }

  state = {
    questionTextValue: "",
    answerTextValue: "",
    inputColumnNum: 40,
    inputRowNum: 5,
    outputColumnNum: 50,
    outputRowNum: 15,
    isReadOnly: true,
    timeRecordName: "time_record_now",
    timeLimitNumber: 20 * 1000,
  };

  //在组件的更新已经同步到DOM中之后立刻被调用,该方法不会在初始化渲染的时候调用,使用该方法可以在组件更新之后操作DOM元素
  componentDidUpdate(prevProps, prevState) {
    console.info("Tackle component did update...");
    console.dir(this);
    console.dir(prevProps);
    console.dir(prevState);
  }

  handleInput = (type, event) => {
    console.log("type");
    console.log(type);

    console.log("event");
    console.log(event);

    let value = event.target.value;
    let newState = {};
    newState[type] = value;
    this.setState(newState);
  };

  resetQuestionText = () => {
    this.setState({
      questionTextValue: "",
    });
  };

  setNowTime = () => {
    let times: any = Date.now();
    localStorage.setItem(this.state.timeRecordName, times);
  };

  judgeLimitTime = () => {
    let times = Date.now();

    let previousTimes = localStorage.getItem(this.state.timeRecordName);
    if (
      previousTimes === undefined ||
      previousTimes === "" ||
      previousTimes === null
    ) {
      return true;
    }

    let lastTime = parseInt(previousTimes);
    console.log(times + " - " + lastTime);

    if (times - lastTime <= this.state.timeLimitNumber) {
      alert("请20秒后再提问!");
      return false;
    }

    return true;
  };

  verifyQuestText = (doubtInfo: string) => {
    const spaceReg = /^\s+$/;
    doubtInfo = this.state.questionTextValue;
    let verifyFlag = true;

    if (
      doubtInfo.match(spaceReg) ||
      doubtInfo === null ||
      doubtInfo === undefined ||
      doubtInfo === ""
    ) {
      alert("Invaild String! Entry Retry!");
      verifyFlag = false;
    }
    return verifyFlag;
  };

  sendQuestion = (doubtInfo: string) => {
    let aiBody = getOpenAiModel(doubtInfo);
    console.dir(aiBody);

    let url = `https://api.openai.com/v1/engines/${aiBody.model_engine}/completions`;
    let auth = `Bearer ${aiBody.API_KEY}`;

    axios
      .post(url, aiBody.reqBody, {
        headers: { "Content-Type": "application/json", Authorization: auth },
      })
      .then((resp) => {
        console.dir(resp);
        const message = resp.data.choices[0].text;
        console.log("message: " + message);

        this.setState({
          answerTextValue: message,
        });
        this.setNowTime();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  uploadQuestion = () => {
    let verifyFlag = this.verifyQuestText(this.state.questionTextValue);
    if (verifyFlag === false) {
      return;
    }
    console.log("pass through");

    let timeFlag = this.judgeLimitTime();
    if (timeFlag === false) {
      return;
    }
    console.log("pass through - 2");

    this.sendQuestion(this.state.questionTextValue);
  };

  render() {
    return (
      <div className="form_div">
        <form id="mineSubmitForm">
          <div className="questLabelDiv">
            <label>
              <textarea
                form="mineSubmitForm"
                placeholder="请输入问题(每个问题的提问间隔时间为20秒)"
                cols={this.state.inputColumnNum}
                rows={this.state.inputRowNum}
                className="questionInput"
                wrap="hard"
                typeof="reset"
                value={this.state.questionTextValue}
                onChange={this.handleInput.bind(this, "questionTextValue")}
              ></textarea>
            </label>
          </div>
          <div className="btnsDiv">
            <div className="submitDiv">
              <input
                type="button"
                value="提交"
                className="submitInput"
                onClick={this.uploadQuestion}
              />
            </div>
            <div className="resetDiv">
              <input
                type="button"
                value="清空"
                className="resetInput"
                onClick={this.resetQuestionText}
              />
            </div>
          </div>
          <div className="answerLabelDiv">
            <label htmlFor="answerText"></label>
            <textarea
              wrap="hard"
              id="answerText"
              cols={this.state.outputColumnNum}
              rows={this.state.outputRowNum}
              readOnly={this.state.isReadOnly}
              value={this.state.answerTextValue}
            >
              {this.state.answerTextValue}
            </textarea>
          </div>
        </form>
      </div>
    );
  }
}

export default Tackle;
