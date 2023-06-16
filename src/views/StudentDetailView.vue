<template>
  <div class="app">
    <h1>Student Detail {{ qid }}</h1>
    <div class="studentDetail-container">
      <div class="studentInfo">
        <ul>
          <li>이름: {{ student.name }}</li>
          <li>학부: {{ student.department }}</li>
          <li>현재 포인트:{{ student.pointStatus?.currentPoint }}</li>
          <li>누적 포인트:{{ student.pointStatus?.totalPoint }}</li>
          <li>등급: {{ student.pointStatus?.rank }}</li>
        </ul>
        <hr />
      </div>
      <h4>내가 작성한 질문</h4>
      <div class="questionList">
        <table>
          <tr v-for="question in student.postedQuestions" :key="question.id">
            <td @click="goQuestionDetail(question.id)">
              {{ question.title }}
            </td>
          </tr>
        </table>
      </div>
      <hr />

      <h4>내가 답변한 질문</h4>
      <div class="questionList">
        <ul v-for="question in student.answeredQuestions" :key="question.id">
          <li @click="goQuestionDetail(question.id)">
            {{ question.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionDetailView",
  data() {
    return {
      student: {},
    };
  },
  mounted() {
    this.sid = this.$route.params.sid;
    // Fetch data from the server
    fetch("https://localhost:8443/students/" + this.sid)
      .then((res) => res.json())
      .then((res) => {
        this.student = res.data;
      });
  },
  methods: {
    goQuestionDetail(qid) {
      this.$router.push("/questions/" + qid);
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
