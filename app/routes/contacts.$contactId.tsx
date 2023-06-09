import type {
  ActionFunction,
  LoaderArgs,
  LoaderFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { deleteContact, getContactById } from "prisma/contacts";
import type { GetAllContacts } from "./contacts.enum";
import { useLoaderData, Form, Link } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
  console.log(params);
  const contact = await getContactById(Number(params.contactId));
  return contact;
};

export const action: ActionFunction = async ({ params }) => {
  await deleteContact(Number(params.contactId));
  return redirect("/contacts");
};

export default function ContactDetailsData() {
  const { id, firstName, lastName, email, phone } =
    useLoaderData<GetAllContacts>();
  return (
    <div>
      <h1>Contacts Details</h1>

      <div>
        <h2>
          {firstName} {lastName}
        </h2>
        <p>{email}</p>
        <p>{phone}</p>
      </div>

      <Link to={`/contacts/edit/${id}`}>
        <button>Edit</button>
      </Link>
      <Form method="post">
        <button type="submit">Delete</button>
      </Form>
    </div>
  );
}
