import { seedDatabaseFromClient } from "./src/services/seedService";
seedDatabaseFromClient().then(errors => {
  console.log("Seed done. Errors:", errors);
  process.exit(0);
}).catch(err => {
  console.error("Seed failed:", err);
  process.exit(1);
});
