<template>
  <div class="app">
    <h1>Question Detail {{ qid }}</h1>
    <div class="question-container">
      <div class="question">
        <p class="student-name" @click="goStudentDetail(question.student?.id)">
          질문자: {{ question.student?.name }}
        </p>
        <h2>{{ question.title }}</h2>
        <p>{{ question.content }}</p>
        <div class="image-container">
          <img
            v-for="image in question.images"
            :key="image"
            :src="'https://localhost:8443/questions/images?url=' + image"
            alt="Question Image"
            loading="lazy"
            width="200"
            height="200"
          />
        </div>
        <p>
          댓글 <strong>{{ question.commentCount }}</strong
          >개
        </p>

        <!--질문댓글-->
        <div
          class="question-comments"
          v-for="comment in question.comments"
          :key="comment.id"
        >
          <hr />
          <p
            class="comment-student-name"
            @click="goStudentDetail(comment.student?.id)"
          >
            댓글작성자: {{ comment.student.name }}
          </p>
          <p>{{ comment.content }}</p>
        </div>
      </div>
    </div>

    <div class="answer-container">
      <h3>Answers: {{ question.answerCount }}개의 답변</h3>
      <div class="answer" v-for="answer in answers" :key="answer.id">
        <p class="student-name" @click="goStudentDetail(answer.student?.id)">
          답변자: {{ answer.student.name }}
        </p>
        <p>{{ answer.content }}</p>
        <hr />
        <p
          v-bind:class="[
            'answer-state',
            {
              'answer-state-accepted': answer.state === '채택완료',
              'answer-state-not-accepted': answer.state === '채택 대기중',
            },
          ]"
        >
          답변상태: {{ answer.state }}
        </p>
        <button @click="acceptAnswer(question.id, answer.id)">
          Accept Answer
        </button>
        <br />
        <p>
          답변 <strong>{{ answer.commentCount }}</strong
          >개
        </p>

        <!--답변댓글-->
        <div
          class="answer-comments"
          v-for="comment in answer.comments"
          :key="comment.id"
        >
          <hr />
          <p
            class="comment-student-name"
            @click="goStudentDetail(comment.student?.id)"
          >
            댓글작성자: {{ comment.student.name }}
          </p>
          <p>{{ comment.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionDetailView",
  data() {
    return {
      question: {},
      answers: [],
      qid: null,
    };
  },
  mounted() {
    this.qid = this.$route.params.qid;
    // Fetch data from the server
    fetch("https://localhost:8443/questions/" + this.qid)
      .then((res) => res.json())
      .then((res) => {
        this.question = res.data.question;
        this.answers = res.data.answers;
      });
  },
  methods: {
    goStudentDetail(sid) {
      this.$router.push("/students/" + sid);
    },
    acceptAnswer(questionId, answerId) {
      const accessToken = localStorage.getItem("accessToken");
      fetch(
        "https://localhost:8443/questions/" +
          questionId +
          "/answers/" +
          answerId +
          "/accept",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      ).then(() => {
        const targetArr = this.answers.find((obj) => obj.id === answerId);
        targetArr.state = "채택완료";
      });
    },
  },
};
</script>

<style scoped>
div.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.answer-state-not-accepted {
  padding: 10px;
  background-color: #ff0000;
  color: #fff;
}

.answer-state-accepted {
  padding: 10px;
  background-color: #0d00ff;
  color: #fff;
}

.student-name {
  display: inline-block;
  padding: 10px;
  background-color: #219778;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  transition: background-color 0.3s;
  cursor: pointer;
}
.student-name:hover {
  text-decoration: underline;
  background-color: #3877dd;
}

.comment-student-name {
  display: inline-block;
  padding: 10px;
  background-color: #2cd8b5;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-size: 5px;
  cursor: pointer;
}
.comment-student-name:hover {
  text-decoration: underline;
  background-color: #3877dd;
}

button {
  margin: 5px;
}

.question-container {
  margin-bottom: 20px;
}

.question {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
}

.image-container {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

img {
  max-width: 100%;
  height: auto;
}

.answer-container {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
}

.answer {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
