require("child_process").spawn("npx", ["electron", "./electron/main.js"], {
  stdio: "inherit",
  shell: true,
});
