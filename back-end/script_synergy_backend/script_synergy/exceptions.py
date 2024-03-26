class SynergyBaseException(Exception):
    def __init__(self, message):
        self.message = message

    def __str__(self):
        return self.message


class SynergyAuthenticationException(SynergyBaseException):
    def __init__(self, message="Invalid Auth Credential"):
        self.message = message

    def __str__(self):
        return self.message


class SynergyInvalidPasswordException(SynergyBaseException):
    def __init__(self, message="Invalid Password"):
        self.message = message

    def __str__(self):
        return self.message


class SynergyNoSuchUserFoundException(SynergyBaseException):
    def __init__(self, email, message=f"No user found with the email %s"):
        self.message = message
        self.email = email

    def __str__(self):
        return self.message.format([self.email])


class SynergyInvalidRoleException(SynergyBaseException):
    def __init__(self, role, message=f"Invalid Role %s"):
        self.message = message
        self.role = role

    def __str__(self):
        return self.message.format([self.role])
