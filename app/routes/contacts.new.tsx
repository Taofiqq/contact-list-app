import type { CreateContact } from "./contacts.enum";
import { Form } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createContact } from "prisma/contacts";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data: CreateContact = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
  };

  await createContact(data);

  return redirect("/contacts");
};

export default function Create() {
  return (
    <div>
      <h1>Create Contact</h1>
      <Form method="post">
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" />
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />
        <label htmlFor="phone">Phone</label>
        <input type="text" name="phone" id="phone" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
