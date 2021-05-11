const getCurrentUser = async () => {
  try {
    const response = await fetch("/api/v1/current_users")
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw error
    }
    const responseBody = await response.json()
    return responseBody.user
  } catch (err) {
    console.error("Error in fetch!")
    console.error(err)
  }
}

export default getCurrentUser;