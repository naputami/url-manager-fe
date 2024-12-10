export async function handleAction<T>(
  action: () => Promise<T>
): Promise<T | { success: false; message: string }> {
  try {
    const result = await action();
    return result;
  } catch (_error) {
    return {
      success: false,
      message: "Something went wrong. Please try again later",
    };
  }
}
