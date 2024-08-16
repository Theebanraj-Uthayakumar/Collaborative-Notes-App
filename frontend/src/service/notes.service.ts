import ApiConstants from "../shared/constants/apiConstants";
import { Notes } from "../shared/interfaces";
import CommonService from "./common.service";

export const getNotes = async () => {
  const response = await CommonService?.invokeHttpCallFetch(
    "GET",
    ApiConstants?.GET_NOTES_API
  );
  return response;
};

export const createNote = async (note: Notes) => {
  const response = await CommonService?.invokeHttpCallFetch(
    "POST",
    ApiConstants?.CREATE_NOTE_API,
    note
  );
  return response;
};

export const updateNote = async (id: string, note: Notes) => {
  const response = await CommonService?.invokeHttpCallFetch(
    "PUT",
    `${ApiConstants?.UPDATE_NOTE_API}/${id}`,
    note
  );
  return response;
};

export const deleteNote = async (id: string) => {
  const response = await CommonService?.invokeHttpCallFetch(
    "DELETE",
    `${ApiConstants?.DELETE_NOTE_API}/${id}`
  );
  return response;
};

export const shareNote = async (id: string, userid: string) => {
  const response = await CommonService?.invokeHttpCallFetch(
    "POST",
    `${ApiConstants?.SHARE_NOTE_API}/${id}`,
    { userid }
  );
  return response;
};
