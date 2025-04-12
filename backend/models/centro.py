from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Centro(Base):
    __tablename__ = 'centro'

    id = Column(Integer, primary_key=True)
    codigo_centro = Column(Integer, unique=True, nullable=False)
    titular = Column(String, nullable=False)
    rut = Column(String, nullable=False)
    acs = Column(String)
    ubicacion = Column(String)

    inspecciones = relationship("Inspeccion", back_populates="centro")
