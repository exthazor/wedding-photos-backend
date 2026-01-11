import app from "./app.mjs";
import config from "./config/env.mjs";

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
