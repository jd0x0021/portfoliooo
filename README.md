<!-- header -->
<div align="center">
  <img src="https://github.com/user-attachments/assets/6ce2678f-5d68-4e06-805f-e5223d2246a2" width="100" alt="JD Logo" />
  
  # Software Engineer Portfolio

  ![image](https://github.com/user-attachments/assets/400561e0-b7db-4904-9af5-5274f1555126)
  
</div>

I have a strong background in full-stack development, working with various programming languages and technologies. Each project reflects my passion for building well-crafted & intuitive web solutions.

</br>

<!-- body -->
## Installation
To run this project locally, follow these steps:

1. Clone the repository.
```bash
https://github.com/jd0x0021/portfoliooo.git
```

&nbsp;

2. Install dependencies.
```bash
cd portfoliooo
```
```bash
npm install
```

&nbsp;

3. Start the application.
```bash
npm run dev
```

The app will be running at http://localhost:5173.

</br>

## Setting up the Contact Form (for LOCAL environment)
I used <a href="https://www.emailjs.com">EmailJS</a> as an **email delivery service**. These are the guides that I followed:

1. Create Your EmailJS Account & <a href="https://www.emailjs.com/docs/sdk/installation/">Install EmailJS Package</a>.

_Note: don't install axios like the one in the youtube video._

> <a href="https://www.youtube.com/watch?v=wWiTouBHibs">Youtube video to setup EmailJS</a>
>
> <a href="https://mydevpa.ge/blog/how-to-send-emails-in-react-app-using-emailjs">Article to setup EmailJS</a>

&nbsp;

2. Configure your .env file so that you will be able to test your contact form locally (see the next section on how to configure these variables for production environment).

Create a **.env** file at the root of your project (just like in the image below).

After setting up your EmailJS account, add your EmailJS **public key**, **service id**, and **template id** to your .env file (because this will be used in the code).

<img src="https://github.com/user-attachments/assets/3bbe19b8-f60d-4fc9-9c52-aa812aea85d9" width="500" alt="env file usage" />

&nbsp;

3. Test the contact form.

<img src="https://github.com/user-attachments/assets/0caa9a9c-c840-49f4-be92-927110dca49d" width="500" alt="contact form with data" />

&nbsp;

4. We will receive the message from our email if our setup is successful!

<img src="https://github.com/user-attachments/assets/af0b5ff3-2524-4a37-b222-c6284a411868" width="500" alt="message from contact form" />

</br>
</br>

## Hosting and Deployment
My portfolio is hosted on <a href="https://pages.cloudflare.com/">Cloudflare Pages</a>. This is how I set it up:

1. Create a <a href="https://pages.cloudflare.com/">Cloudflare Pages</a> account, then login.
2. On the sidebar select Workers & Pages.
3. Click the Create button.
4. Select Pages tab.
5. Click the Connect to Git button.
6. Select your portfolio's repository, then click Begin setup button.
7. Input the project's details, then click Save and Deploy button.

<img src="https://github.com/user-attachments/assets/d3517b59-ca9a-477a-bd98-8e372e4679ce" width="800" alt="project deployment config" />

&nbsp;

8. Wait until your project is completely deployed. Even after the success message, it may take some time for your project to be fully deployed.
9. On the sidebar select Workers & Pages, then select your project.
10. Go to the Settings tab, then select Variables and Secrets, and add the EmailJS properties (so that the send email functionality will work in production).

<img src="https://github.com/user-attachments/assets/7ffad641-aace-40d5-8ab2-d2c76d482431" width="800" alt="emailjs env properties on cloudflare pages" />

&nbsp;

11. Done! The website is successfully hosted! 🤩
