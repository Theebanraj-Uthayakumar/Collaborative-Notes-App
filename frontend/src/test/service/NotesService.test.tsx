import ApiConstants from "../../shared/constants/apiConstants";
import CommonService from "../../service/common.service";
import { getNotes, createNote, updateNote, deleteNote, shareNote } from "../../service/notes.service";


jest.mock("../../service/common.service", () => ({
  invokeHttpCallFetch: jest.fn()
}));

describe("Notes Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch notes", async () => {
    const mockResponse = [{ id: "1", content: "Test note" }];
    (CommonService.invokeHttpCallFetch as jest.Mock).mockResolvedValue(mockResponse);

    const response = await getNotes();
    expect(response).toBe(mockResponse);
    expect(CommonService.invokeHttpCallFetch).toHaveBeenCalledWith("GET", ApiConstants.GET_NOTES_API);
  });

  it("should create a note", async () => {
    const note: any = { id: "1", content: "New note" };
    const mockResponse = { success: true };
    (CommonService.invokeHttpCallFetch as jest.Mock).mockResolvedValue(mockResponse);

    const response = await createNote(note);
    expect(response).toBe(mockResponse);
    expect(CommonService.invokeHttpCallFetch).toHaveBeenCalledWith("POST", ApiConstants.CREATE_NOTE_API, note);
  });

  it("should update a note", async () => {
    const note: any = { id: "1", content: "Updated note" };
    const mockResponse = { success: true };
    (CommonService.invokeHttpCallFetch as jest.Mock).mockResolvedValue(mockResponse);

    const response = await updateNote("1", note);
    expect(response).toBe(mockResponse);
    expect(CommonService.invokeHttpCallFetch).toHaveBeenCalledWith("PUT", `${ApiConstants.UPDATE_NOTE_API}/1`, note);
  });

  it("should delete a note", async () => {
    const mockResponse = { success: true };
    (CommonService.invokeHttpCallFetch as jest.Mock).mockResolvedValue(mockResponse);

    const response = await deleteNote("1");
    expect(response).toBe(mockResponse);
    expect(CommonService.invokeHttpCallFetch).toHaveBeenCalledWith("DELETE", `${ApiConstants.DELETE_NOTE_API}/1`);
  });

  it("should share a note", async () => {
    const mockResponse = { success: true };
    (CommonService.invokeHttpCallFetch as jest.Mock).mockResolvedValue(mockResponse);

    const response = await shareNote("1", "user123");
    expect(response).toBe(mockResponse);
    expect(CommonService.invokeHttpCallFetch).toHaveBeenCalledWith("POST", `${ApiConstants.SHARE_NOTE_API}/1`, { userid: "user123" });
  });
});