//TODO: เป็นตัวกลางที่เรียกใช้ระหว่าง ฟ้อนเเละเเบ็ก เหมือนเรียก .get ใน vscode2019
//โค้ดเดิม
/*import axios from "axios";

export class Admin {
  #token = localStorage.getItem("token");
  #baseUrl = process.env.VUE_APP_API;
  constructor() { }


  //admin RoomType
  async GetRoomType() {
    let data;
    const config = {
      method: "get",
      headers: {
        "auth-token": this.#token,
      },
      url: `${this.#baseUrl}room/type`,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  };

  async GetTimeLineAdmin() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}log/admin`,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  };

  async GetTimeLinePartner() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}log/partner`,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  };

  async GetTimeLineMember() {
    let data;
    const config = {
      method: "get",
      headers: {
        token: this.#token,
      },
      url: `${this.#baseUrl}log/member`,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  };
  async DeleteMember(_id) {
    let data;
    const config = {
      method: "delete",
      headers: {
        "auth-token": this.#token,
      },
      url: `${this.#baseUrl}member/${_id}`,
    };

    await axios(config)
      .then((result) => {
        if (result) {
          data = result.data;
        }
      })
      .catch((error) => {
        data = error;
      });

    return data;
  };
}*/


import axios from "axios";

export class Admin {
  #token = localStorage.getItem("token");
  #baseUrl = process.env.VUE_APP_API;
  constructor() { }
  
}

