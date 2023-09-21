// import { Company } from "./Company";
// import { User } from "./User";
import { Company } from "./Company";
import { CustomMap } from "./CustomMap";
import { User } from "./User";

const map = new CustomMap
const user = new User
const company = new Company
console.log(user.location);

map.addMarker(user)
map.addMarker(company)