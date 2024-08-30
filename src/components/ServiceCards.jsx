import React from "react";
import { ServiceCard } from "./ui";

export default function ServiceCards( {isFormOpen, setIsFormOpen}  ) {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-center gap-9 pb-[80px] md:pb-[164px]">
      <ServiceCard    isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen}  title="Personal Care Products" description=" ITC’s key personal care brands include Fiama Di Wills, Vivel, Savlon Soap & Handwash, Essenza Di Wills, Superia, and Engage. The personal care market is ever-growing, with high demand for quality products." imgSrc={"https://d3jlwjv6gmyigl.cloudfront.net/images/2021/09/itc-1.jpg"} />
      <ServiceCard title="Stationery" description=" ITC’s stationery brands, such as Classmate, PaperKraft, and Colour Crew, are popular among students and professionals alike. The demand for stationery products ensures a steady business." imgSrc="https://i.pinimg.com/736x/c2/36/4f/c2364f6bbd23eb15be95f446f1f0e927.jpg" />
      <ServiceCard   isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen}   title="Safety Matches and Agarbattis" description=" ITC’s prominent brands in this segment include Safety Matches and Mangaldeep Agarbatti. These products have a vast customer base in both urban and rural areas.

" imgSrc="https://media.licdn.com/dms/image/C4E12AQFXxwAXUAwzKQ/article-cover_image-shrink_600_2000/0/1599302465107?e=2147483647&v=beta&t=HjEckO6-E6-3qgqYCE1-x40VlVY5HxH0zDYx21clevk" />
      <ServiceCard    isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen}      title="Hotels" description="ITC’s hospitality segment includes renowned brands like Fortune Park Hotels and WelcomHeritage Hotels, offering premium services in the hotel industry." imgSrc="https://akm-img-a-in.tosshub.com/indiatoday/images/breaking_news/202402/ITC_30.jpg?VersionId=BP7Gbof1YlYN7dQhQhzW_914S8OFl0xU" />
      <ServiceCard    isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen}  title="Information Technology:" description=" ITC’s IT segment is represented by ITC Infotech India Limited, providing technology solutions and services." imgSrc="https://cdn.zeebiz.com/sites/default/files/styles/zeebiz_850x478/public/2022/10/14/205454-1635359849shutterstock2031504935-1.jpg?itok=1IZhWi8R" />
      <ServiceCard    isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen}   title="Dairy Products" description="The dairy segment is led by the Sunfeast Wonderz Milk brand, catering to the growing demand for dairy products in India." imgSrc="https://i.ytimg.com/vi/cRacteazJPc/sddefault.jpg" />
    </div>
  );
}
