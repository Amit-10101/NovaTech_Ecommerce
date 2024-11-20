import React from "react";
import useFormHandler from "../hooks/useFormHandler.tsx";

const ContactForm: React.FC = () => {
    const {formData, changeHandler, resetForm} = useFormHandler({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted:", formData);
        resetForm();
    };

    return (
        <div
            className="bg-[url('/bg.svg')] bg-no-repeat bg-cover shadow-md border px-6 py-14 mb-14 max-w-[78rem] mx-auto rounded-xl lg:px-20 w-full flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Contact Us</h2>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label htmlFor="name" className="block text-slate-300 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={changeHandler}
                            className="w-full px-3 py-2 rounded-md bg-palette-lightGray/90 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label htmlFor="email" className="block text-slate-300 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={changeHandler}
                            className="w-full px-3 py-2 rounded-md bg-palette-lightGray/90 focus:outline-none"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label htmlFor="subject"
                               className="block text-slate-300 font-medium mb-2">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={changeHandler}
                            className="w-full px-3 py-2 rounded-md bg-palette-lightGray/90 focus:outline-none"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label htmlFor="message"
                               className="block text-slate-300 font-medium mb-2">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={changeHandler}
                            className="w-full px-3 py-2 rounded-md bg-palette-lightGray/90 focus:outline-none"
                            rows={5}
                            required
                        />
                    </div>
                </div>
                <div className="w-full text-center mt-6">
                    <button
                        type="submit"
                        className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition duration-300"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
