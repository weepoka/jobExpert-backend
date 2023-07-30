# 🔥 Job Expert Project

![Logo](https://i.ibb.co/xXCjhqB/o-04-Converted-2.png)
JobExpert is a dynamic and innovative live MCQ website, dedicated to job preparation in Bangladesh. With a vision to empower job seekers, JobExpert provides an interactive platform that offers real-time Multiple Choice Questions (MCQs) for various job sectors. Aspiring candidates can access a vast range of practice tests, covering topics from general knowledge to specialized subjects. The platform's user-friendly interface and adaptive learning system help individuals track their progress and identify areas for improvement. Developed by a team of experienced professionals, JobExpert aims to bridge the gap between job seekers and their dream careers by providing comprehensive and up-to-date study materials. Join JobExpert now and enhance your chances of excelling in the competitive job market of Bangladesh.

## 💦 Home Screen

![Logo](https://i.ibb.co/89PK6KG/job-Expert-Home.png)

## ⚡ Features

- Light/dark mode toggle
- Live previews
- FullScreen mode
- Cross platform
- Admin panel for both teacher and student
- Live exam in 24hrs
- Ads Free

## 🌐 API Reference

#### 🔗Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### 🔗 Get item

```http
  GET /api/student/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id of student to fetch |

#### add(num)

Takes student id and returns the details.

#### 🔗 POST for new user Registration.

```http
  POST /api/signup
```

| Description                                  |
| :------------------------------------------- |
| **Required**. for register new user to fetch |

#### 🔗 POST for user login

```http
  POST /api/login
```

| Description                           |
| :------------------------------------ |
| **Required**. for user login to fetch |

#### 🔗 POST for teacher login and Profile

```http
  POST /api/teacher/${id}
```

| Parameter | Type     | Description                                                 |
| :-------- | :------- | :---------------------------------------------------------- |
| `id`      | `string` | **Required id**. for teacher login or show details to fetch |

#### 🔗 POST for create exam

```http
  POST /api/createexam/${id}
```

| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `id`      | `string` | **Required exam id**. to set exam paper fetch |

## 💦 logo

![Logo](https://i.ibb.co/xXCjhqB/o-04-Converted-2.png)

## 🌩️ Screenshots of Color referance

![App Screenshot](https://i.ibb.co/CWzXLrp/job-Expert-demo-color.png)

## 🌈 Color Reference

| Color           | Hex                                                              |
| --------------- | ---------------------------------------------------------------- |
| Primary Color   | ![#26A4DE](https://via.placeholder.com/10/26A4DE?text=+) #26A4DE |
| Secondary Color | ![#1b849b](https://via.placeholder.com/10/1b849b?text=+) #1b849b |
| Third Color     | ![#caf5ff](https://via.placeholder.com/10/caf5ff?text=+) #caf5ff |
| Fourth Color    | ![#95ecff](https://via.placeholder.com/10/95ecff?text=+) #95ecff |
| Fifth Color     | ![#EAE8E8](https://via.placeholder.com/10/EAE8E8?text=+) #EAE8E8 |
| White color     | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) #ffffff |
| Font color      | ![#000000](https://via.placeholder.com/10/000000?text=+) #000000 |

## 👉 Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`

## 🛠 Project Skills Setup

Javascript, Typescript, MongoDB, Express, Node js,Tailwind, HTML, CSS...

## 🤵 About Me

I'm a full stack developer. As a proficient MERN Stack Project Leader, I orchestrate the end-to-end site development, ensuring seamless communication and collaboration between the Frontend and Backend Developers. My team members, skilled in their respective domains, deliver captivating user interfaces and robust backend functionality. Together, we create cutting-edge web solutions, elevating user experiences.

## 👥 About My Team

The Frontend Developer adeptly crafts captivating user interfaces, implementing modern design principles and seamless interactions. Meanwhile, the Backend Developer leverages their expertise to architect a robust server-side infrastructure, enabling efficient data management and integration. Together, they ensure our MERN Stack site delivers exceptional performance and user satisfaction.

## ⚙️ Tech Stack

**Client:** React, Redux, TailwindCSS,Typescript

**Server:** Node, Express,mongoose,mongoDB

## Usage/Examples

```javascript
import Component from "my-project";

function App() {
  return <Component />;
}
```

## 👉 Installation

Install my-project with npm

```bash
  npm install react typescript redux reduxtoolkit materialui tailwindcss react-hot-toast react-toastify sweetalert react-icons axios mongoose mongodb express nodemon
  cd my-project
```

## ☀️ Used By

This project is used by the following companies:

- Job Expert

## ☀️ Roadmap

- Additional browser support

- Add more integrations
