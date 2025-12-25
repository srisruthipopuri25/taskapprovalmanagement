from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

MAX_BCRYPT_LENGTH = 72  # bcrypt limit in bytes

def hash_password(password: str) -> str:
    truncated = password[:MAX_BCRYPT_LENGTH]
    return pwd_context.hash(truncated)

def verify_password(plain: str, hashed: str) -> bool:
    if not plain or not hashed:
        return False
    truncated = plain[:MAX_BCRYPT_LENGTH]
    return pwd_context.verify(truncated, hashed)
