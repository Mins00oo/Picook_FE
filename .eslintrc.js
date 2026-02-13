// .eslintrc.js
module.exports = {
  // Expo 기본 설정을 상속받되, 더 강력한 규칙을 추가함
  extends: [
    "expo",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["react", "react-native", "import"],
  env: {
    "react-native/react-native": true,
  },
  rules: {
    // ----------------------------------------------------
    // [1] 리액트 & 리액트 네이티브 필수 규칙
    // ----------------------------------------------------
    "react/prop-types": "off", // JS 사용 중이므로 prop-types 강제 끔 (번거로움 방지)
    "react/react-in-jsx-scope": "off", // React 17+ 부터는 import React 안 해도 됨
    "react/display-name": "off", // 컴포넌트 이름 강제 끔

    // React Native 전용 규칙
    "react-native/no-unused-styles": "warn", // 안 쓰는 스타일 있으면 경고 (코드 정리 도움)
    "react-native/no-inline-styles": "off", // style={{ width: 100 }} 처럼 인라인 쓰면 경고 (성능/관리 이슈)
    "react-native/no-color-literals": "off", // 색상 코드(#FFF) 직접 써도 됨 (초반엔 편하게)

    // ----------------------------------------------------
    // [2] 자바스크립트 일반 규칙 (버그 방지)
    // ----------------------------------------------------
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // 안 쓰는 변수 경고 (함수 인자가 _로 시작하면 무시)
    "no-console": "warn", // console.log 남겨두면 경고 (배포 전 확인용)
    "no-undef": "error", // 정의되지 않은 변수 사용 시 에러 (오타 잡는 데 최고)

    // ----------------------------------------------------
    // [3] import 경로 규칙 (제일 중요!)
    // ----------------------------------------------------
    "import/no-unresolved": "error", // 파일 경로 틀리면 무조건 에러
    "import/named": "error", // export 하지 않은 함수를 import 하려 하면 에러
    "import/namespace": "error",
    "import/default": "error",
    "import/export": "error",
  },

  // VS Code가 React Native 파일 확장자를 잘 인식하도록 설정
  settings: {
    "import/ignore": ["react-native"],
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".native.js"],
      },
    },
    react: {
      version: "detect", // 리액트 버전 자동 탐지
    },
  },
};
