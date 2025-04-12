from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Centro(Base):
    __tablename__ = 'centro'

    id = Column(Integer, primary_key=True)
    codigo_centro = Column(Integer, unique=True, nullable=False)
    titular = Column(String(100), nullable=False)
    rut = Column(String(10), nullable=False)
    acs = Column(String(10))
    ubicacion = Column(String(255))

    inspecciones = relationship("Inspeccion", back_populates="centro")
