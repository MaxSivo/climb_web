import io
import base64

class OutputConversion:
    def __init__(self):
        self.grade_mapping = {
            0: 'V4', 1: 'V5', 2: 'V6', 3: 'V7', 
            4: 'V8', 5: 'V9', 6: 'V10+', 7: 'V11',
            8: 'V12', 9: 'V13'
        }

    def convert(self, output):
        output = int(output)
        return self.grade_mapping[output]
    
class TensorDecoder:
    def __init__(self):
        pass
    
    def decode(self, encoded_tensor):
        tensor_bytes = io.Bytes(base64.b64decode(encoded_tensor))
        tensor = np.load(tensor_bytes)
        model_input = tensor.to(torch.float32).flatten()
        return model_input