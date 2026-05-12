---
title: Frequency Modulation (FM)
linkTitle: FM
weight: 2
---

## Code Example

```python {linenos=table,filename="fm_demod.py"}
from scipy.io import wavfile

# Demodulation
x = np.diff(np.unwrap(np.angle(x)))

# De-emphasis filter, H(s) = 1/(RC*s + 1), implemented as IIR via bilinear transform
bz, az = bilinear(1, [75e-6, 1], fs=sample_rate)
x = lfilter(bz, az, x)

# decimate by 6 to get mono audio
x = x[::6]
sample_rate_audio = sample_rate/6

# normalize volume so its between -1 and +1
x /= np.max(np.abs(x))

# some machines want int16s
x *= 32767
x = x.astype(np.int16)

# Save to wav file, you can open this in Audacity for example
wavfile.write('fm.wav', int(sample_rate_audio), x)
```

## Resources

- [End-to-End Example \| PySDR: A Guide to SDR and DSP using Python](https://pysdr.org/content/rds.html)
- [PySDR: A Guide to SDR and DSP using Python](https://pysdr.org)
