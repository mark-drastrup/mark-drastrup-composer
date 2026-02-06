"use client";

import { useState } from "react";
import { addSubscriber } from "../actions";
import styles from "./page.module.css";
import { FormWidget, FormWidgetTextInput } from "@/components/FormWidget";

export default function UnityBackgroundMusicGuidePage() {
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
          title="Free guide: 5 simple steps to adding music in Unity."
          description="In this beginner-friendly guide, you’ll learn how to import music into Unity, and loop it seamlessly — without any coding."
          submitButtonText="Send me the guide"
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
}
