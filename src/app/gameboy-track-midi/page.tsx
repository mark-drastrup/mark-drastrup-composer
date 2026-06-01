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
          title="Free midi for a gameboy track"
          description="This midi track contains the full gameboy track I have demoed on my channel."
          submitButtonText="Send me the midi tracks"
          isLoading={isPending}
          successMessage={subscribeSuccess}
          errorMessage={subscribeError}
          leadMagnetId="gameboy-midi-track"
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
