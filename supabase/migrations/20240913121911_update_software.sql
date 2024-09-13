ALTER TABLE public.softwares
ADD COLUMN type character varying(20) NOT NULL DEFAULT 'manual';

CREATE INDEX idx_softwares_type ON public.softwares (type);

