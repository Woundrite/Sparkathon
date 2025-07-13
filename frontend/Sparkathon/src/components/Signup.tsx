import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";

function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const onSubmit = async () => {
        if (
            formData.email === "" ||
            formData.username === "" ||
            formData.password === "" ||
            formData.confirmPassword === ""
        )
            return;

        let email = formData.email;
        let username = formData.username;
        let password = formData.password;
        let confirmPassword = formData.confirmPassword;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful:", data);
                window.location.href = "/"; // Redirect to home page on successful login
                // You can store the token in localStorage or handle it as needed
                if ("token" in data) localStorage.setItem("token", data.token);
                else if ("username" in data) {
                    if (
                        data.username ==
                        "A user with that username already exists."
                    )
                        alert(
                            "Username already exists. Please choose a different username."
                        );
                }
            } else {
                console.error("Login failed:", response.statusText);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <div>
            <div className="text-gray-800 text-3xl flex justify-center m-4">
                SIGN UP
            </div>

            <div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="pl-2 text-lg">email id</div>
                        <div className="mx-2 py-2 bg-gray-100 rounded">
                            <input
                                required
                                placeholder="Email"
                                type="email"
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setFormData({
                                        ...formData,
                                        email: event.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="pl-2 text-lg">username</div>
                        <div className="mx-2 py-2 bg-gray-100 rounded">
                            <input
                                required
                                placeholder="Username"
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setFormData({
                                        ...formData,
                                        username: event.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    {/* {errors.password && <span>This field is required</span>} */}

                    <div className="flex flex-col gap-2">
                        <div className="pl-2 text-lg">password</div>
                        <div className="mx-2 py-2 bg-gray-100 rounded">
                            <input
                                required
                                type="password"
                                placeholder="Password"
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setFormData({
                                        ...formData,
                                        password: event.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="pl-2 text-lg">confirm password</div>
                        <div className="mx-2 py-2 bg-gray-100 rounded">
                            <input
                                required
                                type="password"
                                placeholder="Confirm Password"
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setFormData({
                                        ...formData,
                                        confirmPassword: event.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div>
                            <button
                                type="submit"
                                onClick={onSubmit}
                                className="px-2 py-1 text-gray-500 text-xl rounded-lg border-gary-500 border-1 active:bg-gray-400 active:text-white hover:bg-gray-300 hover:text-white cursor-pointer hover:border-gray-400"
                            >
                                Sign Up
                            </button>
                        </div>
                        <div>Already have an account?</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
