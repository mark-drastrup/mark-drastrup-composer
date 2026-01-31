"use client";

import { useState } from "react";
import { addSubscriber } from "../actions";
import styles from "./page.module.css";
import { FormWidget, FormWidgetTextInput } from "@/components/FormWidget";

export default function NewsletterPage() {
  const [isPending, setIsPending] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState("");
  const [subscribeError, setSubscribeError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    const response = await addSubscriber(formData);

    if (response.successMessage) {
      setSubscribeSuccess(response.successMessage);
    } else if (response.errorMessage) {
      setSubscribeError(response.errorMessage);
    }
    setIsPending(false);
  };

  return (
    <main className={styles["newsletter"]}>
      <div className={styles["widget-wrapper"]}>
        <FormWidget
          title="The aspiring composers guide to background music in games"
          description="In this guide, you'll get 5 simple steps to add background music to a game in the Unity game engine."
          submitButtonText="Sign up"
          isLoading={isPending}
          successMessage={subscribeSuccess}
          errorMessage={subscribeError}
          onSubmit={handleSubmit}
        >
          <FormWidgetTextInput
            name="first_name"
            placeholder="First Name"
            required
          />
          <FormWidgetTextInput name="email" placeholder="Email" required />
        </FormWidget>
      </div>
    </main>
  );

  // return (
  //   <main className={styles["newsletter"]}>
  //     <form onSubmit={(e) => handleSubmit(e)}>
  //       <h2>Subscribe to our Newsletter</h2>
  //       <label htmlFor="email">First name</label>
  //       <input type="text" name="first_name" required />

  //       <label htmlFor="email">Email Address:</label>
  //       <input type="email" name="email" required />
  //       <button type="submit" disabled={isPending}>
  //         {isPending ? "Processing..." : "SUBSCRIBE"}
  //       </button>
  //     </form>

  //     <div className="min-h-[75px] flex justify-center items-center">
  //       {subscribeSuccess && (
  //         <p className="text-green-500">{subscribeSuccess}</p>
  //       )}
  //       {subscribeError && <p className="text-red-500">{subscribeError}</p>}
  //     </div>
  //   </main>
  // );
}
